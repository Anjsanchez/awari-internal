using API.Models.inventory;
using System;
using System.Collections.Generic;

namespace API.Dto.inventory
{
    public class PurchaseReqCreateDto
    {
        public PurchaseReqHeaderCreateDto Header { get; set; }
        public List<PurchaseReqLineCreateDto> Lines { get; set; }
    }
    public class PurchaseReqReadDto
    {
        public PurchaseReq Header { get; set; }
        public List<PurchaseReqLines> Lines { get; set; }
    }

    public class PurchaseReqHeaderCreateDto
    {
        public Guid? _id { get; set; }
        public string CreatedById { get; set; }
        public string RequestedById { get; set; }
    }
    public class PurchaseReqLineCreateDto
    {
        public Guid? _id { get; set; }
        public string PurchaseReqId { get; set; }
        public string InventoryMasterId { get; set; }
        public string LineQuantity { get; set; }
        public string Note { get; set; }
    }
}
