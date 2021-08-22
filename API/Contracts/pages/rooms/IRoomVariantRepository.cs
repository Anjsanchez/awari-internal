using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;

namespace API.Contracts.pages.rooms
{
    public interface IRoomVariantRepository : IRepositoryBase<RoomVariant>
    {
        Task<RoomVariant> getVariantByName(string roomVariant);
        Task<List<RoomVariant>> getActiveVariants();
    }
}