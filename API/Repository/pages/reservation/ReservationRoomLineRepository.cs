using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.reservation;
using API.Data;
using API.Models.reservation;
using Microsoft.EntityFrameworkCore;

namespace API.Repository.pages.reservation
{
    public class ReservationRoomLineRepository : IReservationRoomLineRepository
    {
        private readonly resortDbContext _db;

        public ReservationRoomLineRepository(resortDbContext db)
        {
            _db = db;
        }

        public async Task<bool> Create(ReservationRoomLine entity)
        {
            await _db.ReservationRoomLines.AddAsync(entity);
            return await Save();
        }

        public Task<bool> Delete(ReservationRoomLine entity)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<ReservationRoomLine>> FindAll()
        {
            return await _db.ReservationRoomLines
                        .Include(n => n.user)
                        .ToListAsync();
        }

        public async Task<ReservationRoomLine> FindById(Guid id)
        {
            return await _db.ReservationRoomLines
                            .Include(n => n.user)
                            .FirstOrDefaultAsync(n => n._id == id);
        }


        public async Task<List<ReservationRoomLine>> GetLineByHeaderId(Guid headerId)
        {
            var xlines = await FindAll();

            var z = xlines.Where(n => n.reservationHeaderId == headerId).ToList();

            return z;
        }

        public async Task<bool> Save()
        {
            var changes = await _db.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<bool> Update(ReservationRoomLine entity)
        {
            _db.ReservationRoomLines.Update(entity);
            return await Save();
        }
    }
}