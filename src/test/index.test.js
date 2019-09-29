// here we import all other tests
// basic test
import chaiHttp from 'chai-http';
import chai from 'chai';
import server from '../server';

chai.should();
chai.use(chaiHttp);
const route = '/api';
describe('Basic server test', () => {
  it('should return a response', async () => {
    const res = await chai.request(server).get(route);
    res.body.message.should.equal('Hey! this is her-tech-trail');
  });
});
