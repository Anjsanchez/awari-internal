using System.Threading.Tasks;
using API.Models;

namespace API.Contracts.pages
{
    public interface IRoleRepository : IRepositoryBase<Role>
    {
        Task<Role> getRoleByUsername(string username);
    }
}