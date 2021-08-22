using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class roomPricingTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RoomPricings",
                columns: table => new
                {
                    _id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    roomId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    capacity = table.Column<int>(type: "int", nullable: false),
                    sellingPrice = table.Column<int>(type: "int", nullable: false),
                    createdBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    createdDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomPricings", x => x._id);
                    table.ForeignKey(
                        name: "FK_RoomPricings_Rooms_roomId",
                        column: x => x.roomId,
                        principalTable: "Rooms",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RoomPricings_Users_createdBy",
                        column: x => x.createdBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RoomPricings_createdBy",
                table: "RoomPricings",
                column: "createdBy");

            migrationBuilder.CreateIndex(
                name: "IX_RoomPricings_roomId",
                table: "RoomPricings",
                column: "roomId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RoomPricings");
        }
    }
}
