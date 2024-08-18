culture_path = File.expand_path("../culture", __dir__)
files = Dir["#{culture_path}/*.md"]

files.each do |file|
  puts File.read(file)
  puts
end
