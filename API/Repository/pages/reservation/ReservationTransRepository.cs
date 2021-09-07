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
    public class ReservationTransRepository : IReservationTransRepository
    {
        private readonly resortDbContext _db;

        public ReservationTransRepository(resortDbContext db)
        {
            _db = db;
        }

        public async Task<bool> Create(ReservationTransLine entity)
        {
            await _db.ReservationTransLines.AddAsync(entity);
            return await Save();
        }

        public async Task<bool> createRange(List<ReservationTransLine> lines)
        {
            await _db.ReservationTransLines.AddRangeAsync(lines);
            return await Save();
        }

        public async Task<bool> Delete(ReservationTransLine entity)
        {
            _db.ReservationTransLines.Remove(entity);
            return await Save();
        }

        public async Task<ICollection<ReservationTransLine>> FindAll(bool isActiveOnly = false)
        {
            return await _db.ReservationTransLines
                   .Include(n => n.discount)
                   .Include(n => n.product)
                   .Include(n => n.reservationHeader)
                   .Include(n => n.reservationRoomLine)
                   .Include(n => n.user)
                   .ToListAsync();
        }

        public async Task<ReservationTransLine> FindById(Guid id)
        {
            return await _db.ReservationTransLines
             .Include(n => n.discount)
             .Include(n => n.product)
             .Include(n => n.reservationHeader)
             .Include(n => n.reservationRoomLine)
             .Include(n => n.user)
                  .FirstOrDefaultAsync(n => n._id == id);
        }

        public async Task<List<ReservationTransLine>> GetPaymentByHeaderId(Guid headerId)
        {
            var datas = await FindAll();

            return datas.Where(n => n.reservationHeaderId == headerId).ToList();
        }

        public async Task<bool> Save()
        {
            var changes = await _db.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<bool> Update(ReservationTransLine entity)
        {
            _db.ReservationTransLines.Update(entity);
            return await Save();
        }
    }
}