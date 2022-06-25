import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/match';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verificando rota /leaderBoardHome', () => {
  let chaiHttpResponse: Response;

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkeGkuSHhrMWN6QU8wblpSLi5CMzkzdTEwYUVEMFJRMU4zUEFFWFE3SHh0TGpLUEVaQnUuUFcifSwiaWF0IjoxNjU2MDgzODMyLCJleHAiOjE2NTg2NzU4MzJ9.knWHWtuwG-9UZtSCYugGrlbl3E5QYbJTBn2l0sFpUPs';

  it('É possível buscar por todas as partidas', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .get('/leaderBoard/home')
        .set('authorization', token);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.a.property('name');
    expect(chaiHttpResponse.body[0]).to.have.a.property('totalPoints');
    expect(chaiHttpResponse.body[0]).to.have.a.property('totalGames');
    expect(chaiHttpResponse.body[0]).to.have.a.property('totalVictories');
    expect(chaiHttpResponse.body[0]).to.have.a.property('totalDraws');
    expect(chaiHttpResponse.body[0]).to.have.a.property('totalLosses');
    expect(chaiHttpResponse.body[0]).to.have.a.property('goalsFavor');
    expect(chaiHttpResponse.body[0]).to.have.a.property('goalsOwn');
    expect(chaiHttpResponse.body[0]).to.have.a.property('goalsBalance');
    expect(chaiHttpResponse.body[0]).to.have.a.property('efficiency');
  });

  it('É possível buscar por todas as partidas em andamento', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .get('/leaderBoard/away')
        .set('authorization', token);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.a.property('name');
    expect(chaiHttpResponse.body[0]).to.have.a.property('totalPoints');
    expect(chaiHttpResponse.body[0]).to.have.a.property('totalGames');
    expect(chaiHttpResponse.body[0]).to.have.a.property('totalVictories');
    expect(chaiHttpResponse.body[0]).to.have.a.property('totalDraws');
    expect(chaiHttpResponse.body[0]).to.have.a.property('totalLosses');
    expect(chaiHttpResponse.body[0]).to.have.a.property('goalsFavor');
    expect(chaiHttpResponse.body[0]).to.have.a.property('goalsOwn');
    expect(chaiHttpResponse.body[0]).to.have.a.property('goalsBalance');
    expect(chaiHttpResponse.body[0]).to.have.a.property('efficiency');
  });

  it('É possível buscar por todas as partidas finalizadas', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .get('/leaderBoard')
        .set('authorization', token);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.a.property('name');
    expect(chaiHttpResponse.body[0]).to.have.a.property('totalPoints');
    expect(chaiHttpResponse.body[0]).to.have.a.property('totalGames');
    expect(chaiHttpResponse.body[0]).to.have.a.property('totalVictories');
    expect(chaiHttpResponse.body[0]).to.have.a.property('totalDraws');
    expect(chaiHttpResponse.body[0]).to.have.a.property('totalLosses');
    expect(chaiHttpResponse.body[0]).to.have.a.property('goalsFavor');
    expect(chaiHttpResponse.body[0]).to.have.a.property('goalsOwn');
    expect(chaiHttpResponse.body[0]).to.have.a.property('goalsBalance');
    expect(chaiHttpResponse.body[0]).to.have.a.property('efficiency');
  });
});
