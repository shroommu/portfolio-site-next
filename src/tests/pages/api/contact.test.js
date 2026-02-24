/** @jest-environment node */

jest.mock('nodemailer', () => ({
  __esModule: true,
  default: {
    createTransport: jest.fn(),
  },
}));

function getCreateTransportMock() {
  return jest.requireMock('nodemailer').default.createTransport;
}

function createMockRes() {
  const res = {
    statusCode: 200,
    headers: {},
    body: null,
    setHeader: jest.fn((key, value) => {
      res.headers[key] = value;
    }),
    status: jest.fn((code) => {
      res.statusCode = code;
      return res;
    }),
    json: jest.fn((payload) => {
      res.body = payload;
      return res;
    }),
  };

  return res;
}

describe('/api/contact handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    delete process.env.SMTP_HOST;
    delete process.env.SMTP_PORT;
    delete process.env.SMTP_SECURE;
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASS;
    delete process.env.CONTACT_TO_EMAIL;
    delete process.env.CONTACT_FROM_EMAIL;
  });

  it('returns 405 for non-POST requests', async () => {
    const { default: handler } = await import('../../../pages/api/contact');
    const req = { method: 'GET' };
    const res = createMockRes();

    await handler(req, res);

    expect(res.setHeader).toHaveBeenCalledWith('Allow', ['POST']);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.body).toEqual({ error: 'Method Not Allowed' });
  });

  it('returns ok for honeypot spam submissions', async () => {
    const { default: handler } = await import('../../../pages/api/contact');
    const req = {
      method: 'POST',
      body: {
        name: 'Alex',
        email: 'alex@example.com',
        message: 'Hi',
        website: 'spam-bot',
      },
    };
    const res = createMockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.body).toEqual({ ok: true });
    expect(getCreateTransportMock()).not.toHaveBeenCalled();
  });

  it('returns 400 when required fields are missing', async () => {
    const { default: handler } = await import('../../../pages/api/contact');
    const req = {
      method: 'POST',
      body: {
        name: '  ',
        email: '',
        message: 'hello',
        website: '',
      },
    };
    const res = createMockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.body).toEqual({ error: 'Missing required fields.' });
  });

  it('returns 400 for invalid email format', async () => {
    const { default: handler } = await import('../../../pages/api/contact');
    const req = {
      method: 'POST',
      body: {
        name: 'Alex',
        email: 'not-an-email',
        message: 'hello',
        website: '',
      },
    };
    const res = createMockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.body).toEqual({ error: 'Please enter a valid email address.' });
  });

  it('sends an email and returns ok', async () => {
    process.env.SMTP_HOST = 'smtp.example.com';
    process.env.SMTP_PORT = '587';
    process.env.SMTP_SECURE = 'false';
    process.env.SMTP_USER = 'smtp-user@example.com';
    process.env.SMTP_PASS = 'secret';
    process.env.CONTACT_TO_EMAIL = 'owner@example.com';
    process.env.CONTACT_FROM_EMAIL = 'no-reply@example.com';

    const sendMail = jest.fn().mockResolvedValue({});
    getCreateTransportMock().mockReturnValue({ sendMail });

    const { default: handler } = await import('../../../pages/api/contact');
    const req = {
      method: 'POST',
      body: {
        name: ' Alex ',
        email: ' sender@example.com ',
        message: 'Hello\nWorld',
        website: '',
      },
    };
    const res = createMockRes();

    await handler(req, res);

    expect(getCreateTransportMock()).toHaveBeenCalledWith({
      host: 'smtp.example.com',
      port: 587,
      secure: false,
      auth: {
        user: 'smtp-user@example.com',
        pass: 'secret',
      },
    });

    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'no-reply@example.com',
        to: 'owner@example.com',
        replyTo: 'sender@example.com',
        subject: 'New portfolio contact message from Alex',
      })
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.body).toEqual({ ok: true });
  });

  it('returns 500 when required SMTP env vars are missing', async () => {
    const { default: handler } = await import('../../../pages/api/contact');
    const req = {
      method: 'POST',
      body: {
        name: 'Alex',
        email: 'alex@example.com',
        message: 'hello',
        website: '',
      },
    };
    const res = createMockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.body).toEqual({
      error: 'Something went wrong while sending your message. Please try again.',
    });
  });

  it('returns 502 when transporter fails', async () => {
    process.env.SMTP_HOST = 'smtp.example.com';
    process.env.SMTP_USER = 'smtp-user@example.com';
    process.env.SMTP_PASS = 'secret';

    const sendMail = jest.fn().mockRejectedValue(new Error('SMTP failure'));
    getCreateTransportMock().mockReturnValue({ sendMail });

    const { default: handler } = await import('../../../pages/api/contact');
    const req = {
      method: 'POST',
      body: {
        name: 'Alex',
        email: 'alex@example.com',
        message: 'hello',
        website: '',
      },
    };
    const res = createMockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(502);
    expect(res.body).toEqual({
      error: 'Something went wrong while sending your message. Please try again.',
    });
  });
});
