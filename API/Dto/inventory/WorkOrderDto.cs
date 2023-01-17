using API.Models;
using System;

namespace API.Dto.inventory
{
    public class WorkOrderCreateDto
    {
        public string TypeOfWork { get; set; }
        public string Location { get; set; }
        public string Reason { get; set; }
        public Guid RequestedById { get; set; }
        public Guid CreatedById { get; set; }
        public string TargetWorkDate { get; set; }
    }
    public class WorkOrderUpdateDto
    {
        public Guid _id { get; set; }
        public string ApprovalStatus { get; set; }
        public Guid ApprovedById { get; set; }
    }
    public class WorkOrderReadDto
    {
        public Guid _id { get; set; }
        public int WorkOrderNumber { get; set; }

        public string ApprovalStatus { get; set; }
        public string TypeOfWork { get; set; }
        public string Location { get; set; }
        public string Reason { get; set; }

        public User RequestedBy { get; set; }
        public DateTime? RequestDate { get; set; }
        public User ApprovedBy { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public User CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }

        public DateTime TargetWorkDate { get; set; }
        public DateTime? ActualDateCompleted { get; set; }
        public string WorkStatus { get; set; }
    }
}
