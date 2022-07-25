const mockingoose = require('mockingoose');
const Customer = require('../models/Customer');
const {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer
} = require('../services/customers');


describe('Customers service', () => {
  describe('getCustomers', () => {
    it ('should return the list of customers', async () => {
      mockingoose(Customer).toReturn([
        {
          _id: '507f191e810c19729de860ea',
          name: 'K Reeves',
          phoneNumber: '0210202323',
          email: 'kreeves@outlook.com',
          status: 'Active',
        },
        {
          _id: '62de402b9fa08bc11069925d',
          name: 'L Fishburne',
          phoneNumber: '04567384',
          email: 'l.fishburne@gmail.com',
          status: 'Lead',
        },
        {
          _id: '62de700c1b33bc581152f828',
          name: 'A Smith',
          phoneNumber: '0227849450',
          email: 'a.smith@mat.com',
          status: 'Non-Active',
        }
      ], 'find');
      const results = await getCustomers();
      expect(results[0].name).toBe('K Reeves');
    });
  });

  describe('getCustomerById', () => {
    it ('should return customer with the customerId', async () => {
      let _customer = {
          _id: '507f191e810c19729de860ea',
          name: 'K Reeves',
          phoneNumber: '0210202323',
          email: 'kreeves@outlook.com',
          status: 'Active',
        };
      mockingoose(Customer).toReturn(_customer, 'findOne');
      const customer = await getCustomerById('507f191e810c19729de860ea');
      expect(JSON.parse(JSON.stringify(customer))).toMatchObject(_customer);
    });
  });

  describe('createCustomer', () => {
    it ('should create the customer', async () => {
      let customer = {
        _id: '62de402b9fa08bc11069925d',
        name: 'L Fishburne',
        phoneNumber: '04567384',
        email: 'l.fishburne@gmail.com',
        status: 'Lead',
      };
      mockingoose(Customer).toReturn(customer, 'save');
      const _customer = await createCustomer(customer);
      expect(JSON.parse(JSON.stringify(_customer))).toMatchObject(customer);
    });
  });

  describe('updateCustomer', () => {
    it ('should update the customer', async () => {
      let customerOld = {
        _id: '62de402b9fa08bc11069925d',
        name: 'L Fishburne',
        phoneNumber: '04567384',
        email: 'l.fishburne@gmail.com',
        status: 'Lead',
      };
      let customerNew = {
        _id: '62de402b9fa08bc11069925d',
        name: 'L Fishburne',
        phoneNumber: '04567384',
        email: 'l.fishburne@gmail.com',
        status: 'Non-Active',
      };
      mockingoose(Customer).toReturn(customerOld, 'findOne');
      mockingoose(Customer).toReturn(customerNew, 'save');
      const _customer = await updateCustomer(customerNew);
      expect(JSON.parse(JSON.stringify(_customer))).toMatchObject(customerNew);
    });
  });
});