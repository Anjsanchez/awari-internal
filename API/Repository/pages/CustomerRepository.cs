using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Contracts.pages;
using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repository.pages
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly resortDbContext _db;

        public CustomerRepository(resortDbContext db)
        {
            _db = db;
        }
        public async Task<bool> Create(Customer entity)
        {
            await _db.Customers.AddAsync(entity);
            return await Save();
        }

        public Task<bool> Delete(Customer entity)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<Customer>> FindAll()
        {
            return await _db.Customers.ToListAsync();
        }

        public async Task<Customer> FindById(Guid id)
        {
            return await _db.Customers.Include(n => n.user).FirstOrDefaultAsync(n => n._id == id);
        }

        public async Task<Customer> getCustomerByCustomerId(long id)
        {
            return await _db.Customers.Include(n => n.user).FirstOrDefaultAsync(n => n.customerid == id);
        }

        public Task<bool> isExists(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> Save()
        {
            var changes = await _db.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<bool> Update(Customer entity)
        {
            _db.Customers.Update(entity);
            return await Save();
        }
    }
}