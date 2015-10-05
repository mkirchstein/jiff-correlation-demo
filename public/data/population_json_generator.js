[
  {
    'repeat:100': {
      BMI: '{{integer(23, 33)}}',
      Weight: '{{integer(150, 300)}}',
      Height: '{{integer(58, 74)}}',
      Age: '{{integer(24, 64)}}',
      Systolic: '{{integer(110, 160)}}',
      Dyastolic: '{{integer(75, 115)}}',
      Gender: '{{random("M", "F")}}',
      Activity_Level: '{{random("Vigorously","Moderately","Sedentary")}}',
      Health_Level: '{{random("Excellent","Very Good","Good","Fair","Poor")}}'
    }
  }
]
