using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class AddedApprovalHeaderTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ApprovalHeaders",
                columns: table => new
                {
                    _id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    transId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    customerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    voucher = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    agency = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    reservationTypeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    createdBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    createdDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApprovalHeaders", x => x._id);
                    table.ForeignKey(
                        name: "FK_ApprovalHeaders_Customers_customerId",
                        column: x => x.customerId,
                        principalTable: "Customers",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ApprovalHeaders_ReservationTypes_reservationTypeId",
                        column: x => x.reservationTypeId,
                        principalTable: "ReservationTypes",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ApprovalHeaders_Users_createdBy",
                        column: x => x.createdBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalHeaders_createdBy",
                table: "ApprovalHeaders",
                column: "createdBy");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalHeaders_customerId",
                table: "ApprovalHeaders",
                column: "customerId");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalHeaders_reservationTypeId",
                table: "ApprovalHeaders",
                column: "reservationTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApprovalHeaders");
        }
    }
}
