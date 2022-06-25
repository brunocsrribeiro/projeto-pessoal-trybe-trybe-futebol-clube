import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/team';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verificando rota /teams e /teams/:id', () => {
  let chaiHttpResponse: Response;
  const findAll = [{
    id: 18,
    teamName: 'Athletico Paranaense',
  }] as unknown as Team[];

  before(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(findAll);

    sinon
      .stub(Team, "findByPk")
      .resolves({
        id: 1,
        teamName: 'Atlético Mineiro'
      } as Team);
  });

  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
    (Team.findByPk as sinon.SinonStub).restore();
  })

    it('É possível efetuar uma busca por todos os times', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .get('/teams');

    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.property('id');
    expect(chaiHttpResponse.body[0]).to.have.property('teamName');
  });

  it('É possível buscar um time pelo seu id', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/:id')
      .send({ id: 1 });

    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(chaiHttpResponse.body).to.have.property('id');
    expect(chaiHttpResponse.body).to.have.property('teamName');
  });
});
