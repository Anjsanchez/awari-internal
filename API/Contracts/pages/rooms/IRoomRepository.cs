using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models.rooms;

namespace API.Contracts.pages.rooms
{
    public interface IRoomRepository : IRepositoryBase<Room>
    {
        Task<Room> GetRoomByName(string roomName);
        Task<IEnumerable<Room>> GetRoomWithPricing();
    }
}