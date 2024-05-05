import { Request, Response } from 'express';
import db from "../models";
import { getUserById } from '../controllers/userController'; 
import { getAllBrands } from '../controllers/brandController'; 
import {jest} from '@jest/globals';


jest.useFakeTimers()
//'api/users/:id'
describe('getUserById', () => {
    test('should return 404 error when user is not found', async () => {
      // Mocking Sequelize's findByPk method to return null (user not found)
      jest.spyOn(db.User, 'findByPk').mockResolvedValue(null as any);
  
      const req = { params: { id: '1' } } as unknown as Request;
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;
  
      await getUserById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });
  
  });

  describe('getAllBrands', () => {
    test('should return all brands when successful', async () => {
      const mockBrands = [
        { id: 1, name: 'Brand1' },
        { id: 2, name: 'Brand2' },
        { id: 3, name: 'Brand3' },
      ];
  
      // Spy on Sequelize's findAll method to return the mockBrands
      const findAllSpy = jest.spyOn(db.Brand, 'findAll').mockResolvedValue(mockBrands);
  
      const req = {} as Request;
      const res = {
        json: jest.fn(),
      } as unknown as Response;
  
      await getAllBrands(req, res);
  
      expect(res.json).toHaveBeenCalledWith(mockBrands);
  
      // Restore the original implementation of findAll after the test
      findAllSpy.mockRestore();
    });

    test('should return empty array when no brands are found', async () => {
        // Mocking Sequelize's findAll method to return an empty array
        const findAllSpy = jest.spyOn(db.Brand, 'findAll').mockResolvedValue([]);
    
        const req = {} as Request;
        const res = {
          json: jest.fn(),
        } as unknown as Response;
    
        await getAllBrands(req, res);
    
        expect(res.json).toHaveBeenCalledWith([]);
    
        // Restore the original implementation of findAll after the test
        findAllSpy.mockRestore();
      });
    
  
  });