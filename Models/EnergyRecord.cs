namespace hark_ett.Models
{
    public class EnergyRecord
    {
        public int Id { get; set; }
        public DateTime RecordTime { get; set; }
        public float AverageTemp { get; set; }
        public float AverageHumidity { get; set; }
        public float Consumption { get; set; }
        public bool IsAnomaly { get; set; }
    }
}