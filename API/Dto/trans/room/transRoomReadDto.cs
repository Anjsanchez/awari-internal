using System;
using API.Models;
using API.Models.functionality;
using API.Models.rooms;
using API.Models.trans;

namespace API.Dto.trans.room
{
    public class transRoomReadDto
    {
        public Guid _id { get; set; }

        public TransHeader transHeader { get; set; }

        public DateTime startDate { get; set; }

        public DateTime endDate { get; set; }

        public Room room { get; set; }

        public Discount discount { get; set; }

        public float grossAmount { get; set; }
        public float totalDiscount { get; set; }
        public float totalAmount { get; set; }

        public Int32 mattress { get; set; }
        public string remark { get; set; }

        public Int32 adultPax { get; set; }
        public Int32 seniorPax { get; set; }
        public Int32 childrenPax { get; set; }

        public User user { get; set; }

        public DateTime createdDate { get; set; }
    }
}