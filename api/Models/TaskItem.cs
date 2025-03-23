﻿namespace TodoApplication.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;

        public bool IsComplted { get; set; } = false;

    }
}
