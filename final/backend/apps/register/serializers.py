from rest_framework_nested.serializers import NestedHyperlinkedModelSerializer
from rest_framework import serializers
from . import models


class DynamicFieldsNestedHyperlinkedModelSerializer(NestedHyperlinkedModelSerializer):
    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class RegisterSerializer(DynamicFieldsNestedHyperlinkedModelSerializer):
    parent_lookup_kwargs = {
        "camp_pk": "camp__pk",
    }
    user = serializers.PrimaryKeyRelatedField(
        many=False,
        read_only=True,
    )

    class Meta:
        model = models.Registration
        fields = [
            "id", "url", "user", "camp", "name", "sex",
            "nationality", "id_number", "birth_date",
            "school_grade", "special_disease", "fb_link",
            "eating_habit", "email", "contact_number",
            "guardian_name", "guardian_relationship",
            "guardian_contact_number", "introduction",
            "special_experience", "motivation",
            "camp_anticipation", "other", "is_finish",
        ]
        read_only_fields = [
            "camp", "user", "is_finish",
        ]


