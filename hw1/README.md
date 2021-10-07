# wp1101-hw1

## 使用到的元素及介紹

* title：放置在往頁上方置中，代表此相簿的標題
* navigation bar：無導向的導覽列，hover 時顏色會隨之變化
* display box：放置主圖片的區塊，透過 box-shadow 增加陰影，看起來更立體
* thumbnail row：放置縮圖的區塊，透過 @media 控制隨著寬度不同而有不同排版，符合 RWD。初始設置 opacity 為 0.8，當 hover 時會放大圖片並將 opacity 設為 1，讓使用者知道這個照片是被選到的。此外，圖片也都可以進行點擊，點擊後會新增一視窗導向圖片連結，讓使用者可以觀賞原圖片。