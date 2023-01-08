﻿using System;

namespace API.Dto.customers
{
    public class VendorDto
    {
        public Guid? _id { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string EmailAddress { get; set; }

        public Int64 Mobile { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}
