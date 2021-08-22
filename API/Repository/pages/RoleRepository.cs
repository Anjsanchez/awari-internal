using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Contracts.pages;
using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class RoleRepository : IRoleRepository
    {

        private readonly resortDbContext _db;

        public RoleRepository(resortDbContext db)
        {
            _db = db;
        }

        public Task<bool> Create(Role entity)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Delete(Role entity)
        {
            throw new System.NotImplementedException();
        }

        public async Task<ICollection<Role>> FindAll()
        {
            return await _db.Roles.ToListAsync();
        }

        public Task<Role> FindById(Guid id)
        {
            throw new System.NotImplementedException();
        }

        public Task<Role> getRoleByUsername(string username)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> isExists(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Save()
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Update(Role entity)
        {
            throw new System.NotImplementedException();
        }
    }
}