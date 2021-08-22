using System;
using API.Models.rooms;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace API.Contracts.pages.rooms
{
    public interface IRoomPricingRepository : IRepositoryBase<RoomPricing>
    {
        Task<List<RoomPricing>> getPricingByRoomId(Guid roomId);
        Task<List<RoomPricing>> getPricingByRoomVariantId(Guid variantId);
    }
}