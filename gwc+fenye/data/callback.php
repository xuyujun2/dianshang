<?php
    // $a = '"hello world i am from server"';
    // echo "callback($a)";
    $json = '
            {"list":[
                {"id":1,"info":"印花中长宽松短袖衬衫","price":180.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2010080090/3GE2010080090_list_2.jpg"},
                 {"id":2,"info":"印花中长宽松短袖衬衫","price":190.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2011950090/3GE2011950090_list_2.jpg"},
                 {"id":3,"info":"宽松字母印花短袖衬衫","price":210.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2012920000/3GE2012920000_list_2.jpg"},
                 {"id":4,"info":"宽松字母印花短袖衬衫","price":170.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2012920090/3GE2012920090_list_2.jpg"},
                {"id":5,"info":"刺绣宽松短袖POLO衫","price":150.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2020140090/3GE2020140090_list_2.jpg"},
                {"id":6,"info":"人像字母宽松短袖t恤 ","price":140.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GI2024610000/3GI2024610000_list_2.jpg"},
                {"id":7,"info":"我是商品7","price":110.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2020750000/3GE2020750000_list_2.jpg"},
                {"id":8,"info":"polo衫男宽松立领短袖","price":120.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2020750090/3GE2020750090_list_2.jpg"},
                {"id":9,"info":"纯色直筒中腰休闲裤","price":130.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2060260090/3GE2060260090_list_2.jpg"},
                {"id":3,"info":"宽松字母印花短袖衬衫","price":210.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2012920000/3GE2012920000_list_2.jpg"},
                {"id":10,"info":"印花宽松短裤休闲裤","price":170.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2060980090/3GE2060980090_list_2.jpg"},
                {"id":1,"info":"印花中长宽松短袖衬衫","price":180.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2010080090/3GE2010080090_list_2.jpg"},
                 {"id":2,"info":"印花中长宽松短袖衬衫","price":190.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2011950090/3GE2011950090_list_2.jpg"},
                 {"id":3,"info":"宽松字母印花短袖衬衫","price":210.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2012920000/3GE2012920000_list_2.jpg"},
                 {"id":4,"info":"宽松字母印花短袖衬衫","price":170.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2012920090/3GE2012920090_list_2.jpg"},
                {"id":5,"info":"刺绣宽松短袖POLO衫","price":150.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2020140090/3GE2020140090_list_2.jpg"},
                {"id":6,"info":"人像字母宽松短袖t恤 ","price":140.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GI2024610000/3GI2024610000_list_2.jpg"},
                {"id":7,"info":"我是商品7","price":110.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2020750000/3GE2020750000_list_2.jpg"},
                {"id":8,"info":"polo衫男宽松立领短袖","price":120.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2020750090/3GE2020750090_list_2.jpg"},
                {"id":9,"info":"纯色直筒中腰休闲裤","price":130.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2060260090/3GE2060260090_list_2.jpg"},
                {"id":3,"info":"宽松字母印花短袖衬衫","price":210.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2012920000/3GE2012920000_list_2.jpg"},
                {"id":10,"info":"印花宽松短裤休闲裤","price":170.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2060980090/3GE2060980090_list_2.jpg"},
                {"id":1,"info":"印花中长宽松短袖衬衫","price":180.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2010080090/3GE2010080090_list_2.jpg"},
                 {"id":2,"info":"印花中长宽松短袖衬衫","price":190.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2011950090/3GE2011950090_list_2.jpg"},
                 {"id":3,"info":"宽松字母印花短袖衬衫","price":210.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2012920000/3GE2012920000_list_2.jpg"},
                 {"id":4,"info":"宽松字母印花短袖衬衫","price":170.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2012920090/3GE2012920090_list_2.jpg"},
                {"id":5,"info":"刺绣宽松短袖POLO衫","price":150.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2020140090/3GE2020140090_list_2.jpg"},
                {"id":6,"info":"人像字母宽松短袖t恤 ","price":140.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GI2024610000/3GI2024610000_list_2.jpg"},
                {"id":7,"info":"我是商品7","price":110.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2020750000/3GE2020750000_list_2.jpg"},
                {"id":8,"info":"polo衫男宽松立领短袖","price":120.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2020750090/3GE2020750090_list_2.jpg"},
                {"id":9,"info":"纯色直筒中腰休闲裤","price":130.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2060260090/3GE2060260090_list_2.jpg"},
                {"id":10,"info":"印花宽松短裤休闲裤","price":170.00,"img":"http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/trendiano/2018/b/3GE2060980090/3GE2060980090_list_2.jpg"}
                 
]}
 ';

    $cb = @$_GET["callback"]; //$cb就是ergou函数  老师封装时用的是cb，所以用老师的方法话，就要把callback改成cb，而这里用的是jQuery封装的方法，所以用callback

    echo "{$cb}($json)"; //$json就是res参数

?>