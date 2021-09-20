using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models.employee;

namespace API.Contracts.pages.Users
{
    public interface IEmployeeRoleRepository : IRepositoryBase<employeeRole>
    {
        Task<ICollection<employeeRole>> GetRoleByUser(Guid userId);
        Task<bool> deleteRange(Guid userId);
        Task<bool> createRange(List<employeeRole> lines);
    }
}