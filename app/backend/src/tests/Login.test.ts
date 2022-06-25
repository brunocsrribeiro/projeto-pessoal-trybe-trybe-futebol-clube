import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verificação de login', () => {
  let chaiHttpResponse: Response;

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkeGkuSHhrMWN6QU8wblpSLi5CMzkzdTEwYUVEMFJRMU4zUEFFWFE3SHh0TGpLUEVaQnUuUFcifSwiaWF0IjoxNjU2MDgzODMyLCJleHAiOjE2NTg2NzU4MzJ9.knWHWtuwG-9UZtSCYugGrlbl3E5QYbJTBn2l0sFpUPs';

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      } as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('É possível fazer login com sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
          email: 'admin@admin.com',
          password: 'secret_admin',
       });

    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(chaiHttpResponse.body).to.have.property('user');
    expect(chaiHttpResponse.body.user).to.have.property('id');
    expect(chaiHttpResponse.body.user).to.have.property('username');
    expect(chaiHttpResponse.body.user).to.have.property('role');
    expect(chaiHttpResponse.body.user).to.have.property('email');
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('Não é possível fazer login com email incorreto', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
          email: 'admin',
          password: 'secret_admin',
       });

    expect(chaiHttpResponse.status).to.be.eql(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.eql('Incorrect email or password');
  });

  it('Não é possível fazer login com a senha incorreta', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
          email: 'admin@admin.com',
          password: 'secret',
       });

    expect(chaiHttpResponse.status).to.be.eql(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.eql('Incorrect email or password');
  });

  it('Não é possível fazer login sem informar o email do usuário', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
          email: '',
          password: 'secret_admin',
       });

    expect(chaiHttpResponse.status).to.be.eql(400);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.eql('All fields must be filled');
  });

  it('Não é possível fazer login sem o informar a senha do usuário', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
          email: 'admin@admin.com',
          password: '',
       });

    expect(chaiHttpResponse.status).to.be.eql(400);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.eql('All fields must be filled');
  });

  it('Se o Token for válido, o mesmo retornará o tipo de usuário estará efetuando o login', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/login/validate')
       .set('authorization', token)

    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(chaiHttpResponse.body).to.have.contain('admin');
  });
});
