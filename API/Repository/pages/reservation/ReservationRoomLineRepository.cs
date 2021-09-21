using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.reservation;
using API.Data;
using API.Dto.reservations.room;
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

        public async Task<bool> Delete(ReservationRoomLine entity)
        {
            _db.ReservationRoomLines.Remove(entity);
            return await Save();
        }

        public async Task<bool> deleteRange(List<ReservationRoomLine> lines)
        {
            _db.ReservationRoomLines.RemoveRange(lines);
            return await Save();
        }
        public async Task<ICollection<ReservationRoomLine>> FindAll(bool isActiveOnly = false)
        {
            return await _db.ReservationRoomLines
                        .Include(n => n.user)
                        .Include(n => n.room)
                        .Include(n => n.discount)
                        .Include(n => n.reservationHeader)
                        .ToListAsync();
        }

        public async Task<ReservationRoomLine> FindById(Guid id)
        {
            return await _db.ReservationRoomLines
                        .Include(n => n.user)
                        .Include(n => n.room)
                        .Include(n => n.discount)
                        .Include(n => n.reservationHeader)
                        .FirstOrDefaultAsync(n => n._id == id);
        }

        public async Task<ICollection<ReservationRoomLine>> getLineByDates(DateTime fromDate, DateTime toDate)
        {

            var reservations = await FindAll();
            return reservations.Where(n => n.startDate >= fromDate && n.endDate <= toDate).ToList();

        }

        public async Task<List<ReservationRoomLine>> GetLineByHeaderId(Guid headerId)
        {
            var xlines = await FindAll();

            var z = xlines.Where(n => n.reservationHeaderId == headerId).ToList();

            return z;
        }

        private async Task<ICollection<ReservationHeader>> getAllReservationHeader()
        {
            return await _db.ReservationHeaders.ToListAsync();
        }

        public async Task<ICollection<ReservationRoomLine>> GetLinesActiveHeader()
        {
            var rLines = await FindAll(true);
            var rHdr = await getAllReservationHeader();

            var roomWithHeader = (from p in rLines
                                  join c in rHdr on p.reservationHeaderId equals c._id
                                  where (c.isActive == true)
                                  orderby p.endDate ascending
                                  select p).ToList();

            return roomWithHeader;
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