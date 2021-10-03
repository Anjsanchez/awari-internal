using System.Threading.Tasks;
using API.Models.Others;

namespace API.Contracts.pages.Others
{
    public interface ITravelAgencyRepository : IRepositoryBase<TravelAgency>
    {
        Task<TravelAgency> GetAgencyByName(string name);
    }
}