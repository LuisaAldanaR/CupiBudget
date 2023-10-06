using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ProyectoFormativo.Modelos.AuthenticationM
{
    public class User
    {
        [Key]
        public string Username { get; set; } = string.Empty;
        [JsonIgnore]
        public byte[] PasswordHash { get; set; }
        [JsonIgnore]
        public byte[] PasswordSalt { get; set; }
        public string Mail { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }
}
