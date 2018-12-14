$(function(){
    $('#form').bootstrapValidator({
        feedbackIcons:{
            valid:'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:'用户名不能为空'
                    },
                    stringLength:{
                        min:2,
                        max:6,
                        message:'用户名长度必须是2~6位'
                    }
                }
            },
            password: {
                // 配置校验规则
                validators: {
                  // 非空校验
                  notEmpty: {
                    message: "密码不能为空"
                  },
                  // 长度校验
                  stringLength:{
                    min: 6,
                    max: 12,
                    message: "密码长度必须是6-12位"
                  }
                }
              }
        }
    });
})



// $(function() {

//     /*
//      * 1. 进行表单校验配置
//      *    校验要求:
//      *        (1) 用户名不能为空, 长度为2-6位
//      *        (2) 密码不能为空, 长度为6-12位
//      * */
//     $('#form').bootstrapValidator({
  
//       // 配置图标
//       feedbackIcons: {
//         valid: 'glyphicon glyphicon-ok',         // 校验成功
//         invalid: 'glyphicon glyphicon-remove',   // 校验失败
//         validating: 'glyphicon glyphicon-refresh'  // 校验中
//       },
  
//       // 配置校验字段    需要先给input框配置 name
//       fields: {
//         username: {
//           // 配置校验规则
//           validators: {
//             // 配置一个非空
//             notEmpty: {
//               message: "用户名不能为空"
//             },
//             // 长度校验
//             stringLength: {
//               min: 2,
//               max: 6,
//               message: "用户名长度必须是2-6位"
//             }
//           }
//         },
  
//         password: {
//           // 配置校验规则
//           validators: {
//             // 非空校验
//             notEmpty: {
//               message: "密码不能为空"
//             },
//             // 长度校验
//             stringLength:{
//               min: 6,
//               max: 12,
//               message: "密码长度必须是6-12位"
//             }
//           }
//         }
//       }
  
//     });
  
  
//   })