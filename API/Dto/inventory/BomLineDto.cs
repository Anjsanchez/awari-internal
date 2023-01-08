using System;

namespace API.Dto.inventory
{
    public class BomLineDto
    {
        public Guid? _id { get; set; }

        public Guid HeaderId { get; set; }
        public Guid LineId { get; set; }
        public float Quantity { get; set; }
    }
}
