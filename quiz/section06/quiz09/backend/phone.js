import coolsms from 'coolsms-node-sdk';

const mysms = coolsms.default;

export function checkPhone(phone) {
    return phone.length >= 10 && phone.length <= 11;
}

export function getToken() {
    return String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
}

export async function sendTokenToSMS(phone, token) {
    const SMS_KEY = process.env.SMS_KEY;
    const SMS_SECRET = process.env.SMS_SECRET;
    const SMS_SENDER = process.env.SMS_SENDER;

    const messageService = new mysms(SMS_KEY, SMS_SECRET);
    return await messageService.sendOne({
        to: phone,
        from: SMS_SENDER,
        text: `[Web발신] 안녕하세요!! 인증번호는 [${token}] 입니다!!`,
    });
}