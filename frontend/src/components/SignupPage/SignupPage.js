import { Form, Input, Button, Typography } from 'antd';

const SignupPage = () => {
  const onFinish = (values) => {
    console.log('회원가입 데이터:', values);
    // TODO: 백엔드 연동 API 호출
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto' }}>
      <Typography.Title level={2}>회원가입</Typography.Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="이메일" name="email" rules={[{ required: true, message: '이메일을 입력하세요' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="비밀번호" name="password" rules={[{ required: true, message: '비밀번호를 입력하세요' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item label="비밀번호 확인" name="confirm" dependencies={['password']} rules={[
          {
            required: true,
            message: '비밀번호 확인을 입력하세요',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
            },
          }),
        ]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            회원가입
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignupPage;
