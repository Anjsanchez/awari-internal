using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.Users;
using API.Data;
using API.Models.employee;
using Microsoft.EntityFrameworkCore;

namespace API.Repository.pages.user
{
    public class EmployeeRoleRepository : IEmployeeRoleRepository
    {
        private readonly resortDbContext _db;

        public EmployeeRoleRepository(resortDbContext db)
        {
            _db = db;
        }


        public async Task<bool> Create(employeeRole entity)
        {
            await _db.EmployeeRoles.AddAsync(entity);
            return await Save();
        }

        public async Task<bool> createRange(List<employeeRole> lines)
        {
            await _db.EmployeeRoles.AddRangeAsync(lines);
            return await Save();
        }

        public Task<bool> Delete(employeeRole entity)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> deleteRange(Guid userId)
        {
            _db.EmployeeRoles.RemoveRange(_db.EmployeeRoles.Where(n => n.userId == userId));
            return await Save();
        }

        public async Task<ICollection<employeeRole>> FindAll(bool isActiveOnly = false)
        {
            var EmployeeRoles = await _db.EmployeeRoles
                .Include(n => n.user)
                .ToListAsync();

            return EmployeeRoles;
        }


        public async Task<employeeRole> FindById(Guid id)
        {
            return await _db.EmployeeRoles
                .Include(n => n.user)
                    .FirstOrDefaultAsync(n => n._id == id);
        }

        public async Task<ICollection<employeeRole>> GetRoleByUser(Guid userId)
        {
            var x = await FindAll();

            return x.Where(n => n.userId == userId).ToList();
        }

        public async Task<bool> Save()
        {
            var changes = await _db.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<bool> Update(employeeRole entity)
        {
            _db.EmployeeRoles.Update(entity);
            return await Save();
        }
    }
}