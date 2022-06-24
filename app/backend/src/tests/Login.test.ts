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
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('É possível fazer login com a senha incorreta', async () => {
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
});


// .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkeGkuSHhrMWN6QU8wblpSLi5CMzkzdTEwYUVEMFJRMU4zUEFFWFE3SHh0TGpLUEVaQnUuUFcifSwiaWF0IjoxNjU2MDc4Mzk5LCJleHAiOjE2NTg2NzAzOTl9.zFefB4s7jwSOjQjgi9oHJ2heAGc2iQSc8QnnVhZSq2Y')

// user: {
//   id: 1,
//   username: 'Admin',
//   role: 'admin',
//   email: 'admin@admin.com',
// }, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkeGkuSHhrMWN6QU8wblpSLi5CMzkzdTEwYUVEMFJRMU4zUEFFWFE3SHh0TGpLUEVaQnUuUFcifSwiaWF0IjoxNjU2MDc4Mzk5LCJleHAiOjE2NTg2NzAzOTl9.zFefB4s7jwSOjQjgi9oHJ2heAGc2iQSc8QnnVhZSq2Y'