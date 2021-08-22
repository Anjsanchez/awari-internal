using System.Threading.Tasks;
using API.Models.reservation;

namespace API.Contracts.pages.reservation
{
    public interface IReservationTypeRepository : IRepositoryBase<ReservationType>
    {
        Task<ReservationType> GetTypeByName(string taskName);
    }
}