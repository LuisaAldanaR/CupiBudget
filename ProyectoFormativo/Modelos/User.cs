using System.ComponentModel.DataAnnotations;

namespace ProyectoFormativo.Modelos
{
    public class User
    {
        [Key]
        public string Username { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Mail { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }
}
