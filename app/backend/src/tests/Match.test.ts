import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/match';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verificando rota /matches', () => {
  let chaiHttpResponse: Response;

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkeGkuSHhrMWN6QU8wblpSLi5CMzkzdTEwYUVEMFJRMU4zUEFFWFE3SHh0TGpLUEVaQnUuUFcifSwiaWF0IjoxNjU2MDgzODMyLCJleHAiOjE2NTg2NzU4MzJ9.knWHWtuwG-9UZtSCYugGrlbl3E5QYbJTBn2l0sFpUPs';

  const findAll = [{
    id: 50,
    homeTeam: 17,
    awayTeam: 18,
    homeTeamGoals: 0,
    awayTeamGoals: 0,
    inProgress: false,
    teamHome: {
      teamName: 'Atlético Mineiro',
    },

    teamAway: {
      teamName: 'Athletico Paranaense',
    },
  }] as unknown as Match[];

  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(findAll);

    sinon
      .stub(Match, "create")
      .resolves({
        id: 50,
        homeTeam: 17,
        awayTeam: 18,
        homeTeamGoals: 0,
        awayTeamGoals: 0,
      } as Match);

    sinon
      .stub(Match, "update")
      .resolves();
  });

  after(()=>{
    (Match.findAll as sinon.SinonStub).restore();
    (Match.create as sinon.SinonStub).restore();
    (Match.update as sinon.SinonStub).restore();
  })

  it('É possível buscar por todas as partidas', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .get('/matches');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.a.property('id');
    expect(chaiHttpResponse.body[0]).to.have.a.property('homeTeam');
    expect(chaiHttpResponse.body[0]).to.have.a.property('awayTeam');
    expect(chaiHttpResponse.body[0]).to.have.a.property('homeTeamGoals');
    expect(chaiHttpResponse.body[0]).to.have.a.property('awayTeamGoals');
    expect(chaiHttpResponse.body[0]).to.have.a.property('inProgress');
    expect(chaiHttpResponse.body[0]).to.have.a.property('teamHome');
    expect(chaiHttpResponse.body[0]).to.have.a.property('teamAway');
    expect(chaiHttpResponse.body[0].teamHome).to.have.a.property('teamName');
    expect(chaiHttpResponse.body[0].teamAway).to.have.a.property('teamName');
  });

  it('É possível buscar por todas as partidas em andamento', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=true')
        .set('authorization', token);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.a.property('id');
    expect(chaiHttpResponse.body[0]).to.have.a.property('homeTeam');
    expect(chaiHttpResponse.body[0]).to.have.a.property('awayTeam');
    expect(chaiHttpResponse.body[0]).to.have.a.property('homeTeamGoals');
    expect(chaiHttpResponse.body[0]).to.have.a.property('awayTeamGoals');
    expect(chaiHttpResponse.body[0]).to.have.a.property('inProgress');
    expect(chaiHttpResponse.body[0]).to.have.a.property('teamHome');
    expect(chaiHttpResponse.body[0]).to.have.a.property('teamAway');
    expect(chaiHttpResponse.body[0].teamHome).to.have.a.property('teamName');
    expect(chaiHttpResponse.body[0].teamAway).to.have.a.property('teamName');
  });

  it('É possível buscar por todas as partidas finalizadas', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=false')
        .set('authorization', token);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.a.property('id');
    expect(chaiHttpResponse.body[0]).to.have.a.property('homeTeam');
    expect(chaiHttpResponse.body[0]).to.have.a.property('awayTeam');
    expect(chaiHttpResponse.body[0]).to.have.a.property('homeTeamGoals');
    expect(chaiHttpResponse.body[0]).to.have.a.property('awayTeamGoals');
    expect(chaiHttpResponse.body[0]).to.have.a.property('inProgress');
    expect(chaiHttpResponse.body[0]).to.have.a.property('teamHome');
    expect(chaiHttpResponse.body[0]).to.have.a.property('teamAway');
    expect(chaiHttpResponse.body[0].teamHome).to.have.a.property('teamName');
    expect(chaiHttpResponse.body[0].teamAway).to.have.a.property('teamName');
  });

  it('É possível editar partidas', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .patch('/matches/:id')
       .set('authorization', token)
       .send({
          homeTeamGoals: 2,
          awayTeamGoals: 1,
       });
  
    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});
