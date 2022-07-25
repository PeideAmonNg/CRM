const mockingoose = require('mockingoose');
const SalesOpportunity = require('../models/SalesOpportunity');
const {
  getSalesOpportunities,
  getCustomerSalesOpportunities,
  createSalesOpportunity,
  updateSalesOpportunity
} = require('../services/salesOpportunities');


describe('salesOpportunities service', () => {
  describe('getSalesOpportunities', () => {
    it ('should return the list of sales opportunities', async () => {
      let salesOpportunities = [
        {
          _id: '62ddff714bf3350cfeddf9e6',
          customer: '62dd1ee78ac44583ce598323',
          name: 'Adidas marketing',
          status: 'New',
        },
        {
          _id: '62de01a9d7ad6585f2e73d05',
          customer: '507f191e810c19729de860ea',
          name: 'GM campaign 2024',
          status: 'Closed Won',
        },
        {
          _id: '62de020f15ac3244d3cae493',
          customer: '62de700c1b33bc581152f828',
          name: 'talent org',
          status: 'New'
        }
      ];

      mockingoose(SalesOpportunity).toReturn(salesOpportunities, 'find');
      const results = await getSalesOpportunities();
      expect(JSON.parse(JSON.stringify(results))).toMatchObject(salesOpportunities);
    });
  });


  describe('getCustomerSalesOpportunities', () => {
    it ('should return the list of sales opportunities for a customer', async () => {
      let salesOpportunities = [
        {
          _id: '62ddff714bf3350cfeddf9e6',
          customer: '62dd1ee78ac44583ce598323',
          name: 'Adidas marketing',
          status: 'New',
        }
      ];

      mockingoose(SalesOpportunity).toReturn(salesOpportunities, 'find');
      const results = await getCustomerSalesOpportunities('62dd1ee78ac44583ce598323');
      expect(JSON.parse(JSON.stringify(results))).toMatchObject(salesOpportunities);
    });
  });

  describe('createSalesOpportunity', () => {
    it ('should create the sales opportunity', async () => {
      let salesOpportunity= {
        customer: '62dd1ee78ac44583ce598323',
        name: 'Adidas marketing',
        status: 'New',
      };

      mockingoose(SalesOpportunity).toReturn(salesOpportunity, 'save');
      const _salesOpportunity = await createSalesOpportunity(salesOpportunity);
      expect(JSON.parse(JSON.stringify(_salesOpportunity))).toMatchObject(salesOpportunity);
    });
  });

  describe('updateSalesOpportunity', () => {
    it ('should update the sales opportunity', async () => {
      let salesOpportunityOld = {
        _id: '62ddff714bf3350cfeddf9e6',
        customer: '62dd1ee78ac44583ce598323',
        name: 'Adidas marketing',
        status: 'New',
      };
       let salesOpportunityNew = {
        _id: '62ddff714bf3350cfeddf9e6',
        customer: '62dd1ee78ac44583ce598323',
        name: 'Adidas marketing success',
        status: 'Closed Won',
      };

      mockingoose(SalesOpportunity).toReturn(salesOpportunityOld, 'findOne');
      mockingoose(SalesOpportunity).toReturn(salesOpportunityNew, 'save');
      const _salesOpportunity = await updateSalesOpportunity(salesOpportunityNew);
      expect(JSON.parse(JSON.stringify(_salesOpportunity))).toMatchObject(salesOpportunityNew);
    });
  });
});

