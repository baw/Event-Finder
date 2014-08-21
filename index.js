//Only run from command line
if (require.main === module) {
  console.log("Enter a event url to look up new events");
  
  process.stdin.setEncoding('utf8');
  process.stdin.on('readable', function() {
    var link = process.stdin.read();
    
    if (link !== null) {
      
      process.stdin.end();
    }
  });

  process.stdin.on('end', function() {
    process.stdout.write('end');
  });
}

