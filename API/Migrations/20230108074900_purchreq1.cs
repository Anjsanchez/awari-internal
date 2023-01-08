using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class purchreq1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PurchaseReq",
                columns: table => new
                {
                    _id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PurchaseRequisitionNumber = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ApprovalStatus = table.Column<int>(type: "int", nullable: false),
                    ApprovedById = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ApprovedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RequestedById = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RequestDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedById = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TotalQuantity = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseReq", x => x._id);
                    table.ForeignKey(
                        name: "FK_PurchaseReq_Users_ApprovedById",
                        column: x => x.ApprovedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PurchaseReq_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PurchaseReq_Users_RequestedById",
                        column: x => x.RequestedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "PurchaseReqLines",
                columns: table => new
                {
                    _id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PurchaseReqId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LineQuantity = table.Column<float>(type: "real", nullable: false),
                    InventoryMasterId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseReqLines", x => x._id);
                    table.ForeignKey(
                        name: "FK_PurchaseReqLines_InventoryMaster_InventoryMasterId",
                        column: x => x.InventoryMasterId,
                        principalTable: "InventoryMaster",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PurchaseReqLines_PurchaseReq_PurchaseReqId",
                        column: x => x.PurchaseReqId,
                        principalTable: "PurchaseReq",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseReq_ApprovedById",
                table: "PurchaseReq",
                column: "ApprovedById");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseReq_CreatedById",
                table: "PurchaseReq",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseReq_RequestedById",
                table: "PurchaseReq",
                column: "RequestedById");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseReqLines_InventoryMasterId",
                table: "PurchaseReqLines",
                column: "InventoryMasterId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseReqLines_PurchaseReqId",
                table: "PurchaseReqLines",
                column: "PurchaseReqId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PurchaseReqLines");

            migrationBuilder.DropTable(
                name: "PurchaseReq");
        }
    }
}
