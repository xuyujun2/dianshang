<?php
    header("Access-Control-Allow-Origin:*");
    /*
        username => 字段涵义 ; 前端发送给我的用户名信息;
    */
    //1.登陆;
    //2.注册;
    $yz = $_POST["yz"];
    $yzm = $_POST["yzm"];
    $usr = $_POST["username"];
    $pwd = $_POST["password"];
    $type = $_POST["type"];  //判断是登录还是注册
    if($type !== "login" && $type !== "register"){
        $res = array("error"=>"i don't know what are u doing!"); //=>是php里对象的写法，=>左边的是键，右边的是值
        die(json_encode($res));//json_encode是对$res解析，die，输出解析的结果后，终止
    }
    //和数据库建立连接
    require("./_connect.php");
    //把传过来的密码使用md5加密
    $pwd = md5($pwd);
    
    //查看 user是表名字   database是数据库
    $sql_login = "SELECT username,password FROM user"; //a
   
    $sql_register = "INSERT user(
        username,password
    )
        VALUES 
    ('{$usr}','{$pwd}')
    ";
    $result_login = $conn->query($sql_login); //php里->代表点  queryJ方法是执行的意思  这段代码是将a处查询用户名和密码这个功能连接到数据库上执行
    
    $hasuser = FALSE; //用户名是否存在;
    $select_res = FALSE;//储存用户信息;
    $haspwd = FALSE;//该用户名密码是否正确;
    
    while($row = $result_login->fetch_assoc()){ //fetch_assoc相当于forEach   
        //array("username"=>yanghuaizhi,"pwd":"123456")
        if($row["username"] == $usr){ //$usr是输入的用户名   $row["username"]是查询到表中的用户名   如果相等，则说明有户名已有，让$hasuser = TRUE
            $hasuser = TRUE;
            
            if($type == "register"){ //如果点击的是注册按钮，则终止
                break;
            }
            if($row["password"] == $pwd){
                $select_res = json_encode($row);
                $haspwd = TRUE;
                break;
            }
        }
    }

    if($type == "login" &&  $haspwd == TRUE && $yzm ==$yz){ //如果点击的是登陆按钮，且密码是有的，则登录成功
        //用户名密码都对，登录成功
        // die($select_res);
        die("登陆成功"); //die里的内容就是login.html里的res
    }else if($type == "login"){
        //登录失败
        //die("0");
        die("登陆失败");
    }

    if($type == "register" && $hasuser == TRUE){ //如果点击的是注册按钮，如果用户名已有
        //用户名重名; => 2;
        //echo 2;
        echo "用户名已有2"; //echo里的内容就是login.html里的res
    }else if($hasuser == FALSE && $yzm != $yz){ //否则，用户名不存在，则说明可以用这个用户名注册
        //注册成功成功;
        if($type == "register"){
             

             echo "请重新输入验证码";
        }
        //echo 1;
    }else if($hasuser == FALSE){ //否则，用户名不存在，则说明可以用这个用户名注册
        //注册成功成功;
        if($type == "register"){
             $result_register = $conn->query($sql_register); //$result_register是对查询的结果进行存储，这里$result_register=写不写无所谓，因为也没用到，但$conn->query($sql_register)必须要写，因为查询用户名和密码的语句连接到数据库上才能执行

             echo "注册成功";
        }
        //echo 1;
    }

    echo $hasuser;

    //返回结果判定是那种操作在执行;
    // echo $hasuser;
    // echo $select_res;
?>