using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addedColumnVoucher : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "voucher",
                table: "ReservationHeaders",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "voucher",
                table: "ReservationHeaders");
        }
    }
}
