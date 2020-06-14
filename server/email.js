function email(recipient, content) {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
        //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
        service: 'qq',
        port: 465, // SMTP 端口
        secureConnection: true, // 使用 SSL
        auth: {
            user: 'a275313730@qq.com',
            //这里密码不是qq密码，是你设置的smtp密码
            pass: 'zhang520'
        }
    });

    // No need to recreate the transporter object. You can use
    // the same transporter object for all e-mails

    // setup e-mail data with unicode symbols
    const mailOptions = {
        from: 'a275313730@qq.com', // 发件地址
        to: recipient, // 收件列表
        subject: '太鼓成绩系统注册验证码', // 标题
        //text和html两者只支持一种
        text: content, // text 内容
        //html: '<b>Hello world ?</b>' // html 内容
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}

module.exports = email