using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addRoomTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Rooms",
                columns: table => new
                {
                    _id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    roomShortName = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    roomLongName = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    costPrice = table.Column<float>(type: "real", nullable: false),
                    sellingPrice = table.Column<float>(type: "real", nullable: false),
                    numberOfRooms = table.Column<int>(type: "int", nullable: false),
                    allowExtraPax = table.Column<bool>(type: "bit", nullable: false),
                    goodForNumberOfPersons = table.Column<int>(type: "int", nullable: false),
                    isPerPaxRoomType = table.Column<bool>(type: "bit", nullable: false),
                    RoomVariantId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    createdBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rooms", x => x._id);
                    table.ForeignKey(
                        name: "FK_Rooms_RoomVariants_RoomVariantId",
                        column: x => x.RoomVariantId,
                        principalTable: "RoomVariants",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Rooms_Users_createdBy",
                        column: x => x.createdBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_createdBy",
                table: "Rooms",
                column: "createdBy");

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_RoomVariantId",
                table: "Rooms",
                column: "RoomVariantId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Rooms");
        }
    }
}
