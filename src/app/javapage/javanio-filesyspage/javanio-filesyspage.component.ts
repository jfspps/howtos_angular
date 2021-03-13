import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-javanio-filesyspage',
  templateUrl: './javanio-filesyspage.component.html',
  styleUrls: ['./javanio-filesyspage.component.css']
})
export class JavanioFilesyspageComponent implements OnInit {

  response: HighlightResult;

  lang = ["java"];

  path = `
  Path path = FileSystems.getDefault().getPath("fileName.txt");
  printFile(path);  // defined below
  `

  handlePath = `
  private void printFile(Path path) {
    try(BufferedReader fileReader = Files.newBufferedReader(path)) {
        String line;
        while((line = fileReader.readLine()) != null) {
            // do stuff with the line
        }
    } catch(IOException e) {
        System.out.println(e.getMessage());
    }
  }`;

  workingDir = `filePath = Paths.get(".");
  System.out.println(filePath.toAbsolutePath());`;

  usingRelativeToWorking = `// find ./dir2/someFile.txt
  Path path2 = FileSystems.getDefault().getPath("dir2", "someFile.txt");

  // find ../siblingDir/someFile.txt; note that .. moves up to the parent
  Path path3 = FileSystems.getDefault().getPath("..", "siblingDir", "someFile.txt");

  // print the full juxtaposed path with normalize()
  System.out.println(path2.normalize().toAbsolutePath());
  printFile(path2.normalize());`

  fileExists = `Path filePath = FileSystems.getDefault().getPath("files");
System.out.println("Exists = " + Files.exists(filePath));`

  copyFile = `try {
    Path sourceFile = FileSystems.getDefault().getPath("someDir", "file.txt");
    Path copyFile = FileSystems.getDefault().getPath("someDir", "fileCopy.txt");
    Files.copy(sourceFile, copyFile);
} catch(IOException e) {
    e.printStackTrace();
}`

  moveRenameDeleteFile = `try {
  Path fileToDelete = FileSystems.getDefault().getPath("parentDir", "Dir1", "fileCopy.txt");
  Files.deleteIfExists(fileToDelete);

  Path fileToMove = FileSystems.getDefault().getPath("parentDir", "file2.txt");
  Path destination = FileSystems.getDefault().getPath("parentDir", "childDir", "file2.txt");
  Files.move(fileToMove, destination);

  // use copy() to replace the given file and effectively rename it
  // again, note that no exceptions are thrown at this stage
  sourceFile = FileSystems.getDefault().getPath("parentDir", "fileX");
  copyFile = FileSystems.getDefault().getPath("parentDir", "fileY");
  Files.copy(sourceFile, copyFile, StandardCopyOption.REPLACE_EXISTING);

} catch(IOException e) {
  System.out.println(e.getMessage());
}`

  fileAttributes = `Path filePath = FileSystems.getDefault().getPath("exampleDir", "subDir/file.txt");
BasicFileAttributes attrs = Files.readAttributes(filePath, BasicFileAttributes.class);

System.out.println("Size =  " + attrs.size());
System.out.println("Last modified =  " + attrs.lastModifiedTime());
System.out.println("Created = " + attrs.creationTime());
System.out.println("Is directory = " + attrs.isDirectory());
System.out.println("Is regular file = " + attrs.isRegularFile());`;

  readDirectory = `// pass this filter instead of "*.sql" 
// DirectoryStream.Filter<Path> filter = p -> Files.isRegularFile(p);

Path directory = FileSystems.getDefault().getPath("FileTree/Dir");

try (DirectoryStream<Path> contents = Files.newDirectoryStream(directory, "*.sql")) {
    for (Path file : contents) {
        System.out.println(file.getFileName());
    }

    // catch either exception with a bitwise OR
} catch (IOException | DirectoryIteratorException e) {
    System.out.println(e.getMessage());
}`;

  fileSeparator = `Path directory = FileSystems.getDefault().getPath("dirTree" + File.separator + "descendantDir");

// print the separator
String separator = FileSystems.getDefault().getSeparator();
`;

  tempFiles = `try {
  // filePrefix is not normally the final filename
  Path tempFile = Files.createTempFile("filePrefix", ".suffix");
  System.out.println("Temporary file path = " + tempFile.toAbsolutePath());

} catch(IOException e) {
  System.out.println(e.getMessage());
}`;

  drivesAndRoot = `Iterable<FileStore> stores = FileSystems.getDefault().getFileStores();
for(FileStore store : stores) {
    // output is OS specific
    System.out.println("Volume name/Drive letter = " + store);
    System.out.println("file store = " + store.name());
}

Iterable<Path> rootPaths = FileSystems.getDefault().getRootDirectories();
for(Path path : rootPaths) {
    System.out.println("Root directory: " + path);
}`;

  walkingTheTree = `Path dirPath = FileSystems.getDefault().getPath("fileTree" + File.separator + "someDir");
try {
  // using the extension, PrintNames, below
    Files.walkFileTree(dirPath, new PrintNames());
} catch(IOException e) {
    System.out.println(e.getMessage());
}`;

  printFileNames = `public class PrintNames extends SimpleFileVisitor<Path> {

  // handles files
  @Override
  public FileVisitResult visitFile(Path file, BasicFileAttributes attrs)
   throws IOException {
      System.out.println(file.toAbsolutePath());
      return FileVisitResult.CONTINUE;
  }

  // handles methods run before a directory is processed
  // there are other methods e.g. postVisitDirectory which can be overridden
  @Override
  public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs)
   throws IOException {
      System.out.println(dir.toAbsolutePath());
      return FileVisitResult.CONTINUE;
  }

  // override the default IOException throwing behaviour if a file is not found
  @Override
  public FileVisitResult visitFileFailed(Path file, IOException exc)
   throws IOException {
      System.out.println("Error accessing file: " + file.toAbsolutePath() 
        + " " + exc.getMessage());
      return FileVisitResult.CONTINUE;
  }
}`;

  copyFilesFound = `Path source = FileSystems.getDefault().getPath(
  "FileTree" + File.separator + "subDir");
Path destination = FileSystems.getDefault().getPath(
  "FileTree" + File.separator + "subDir" + File.separator + "anotherSubDir");
try {
    Files.walkFileTree(source, new CopyFiles(source, destination));

} catch(IOException e) {
    System.out.println(e.getMessage());
}`;

  copyFilesFoundSupport = `public class CopyFiles extends SimpleFileVisitor<Path> {

  private Path sourceRoot;
  private Path targetRoot;

  public CopyFiles(Path sourceRoot, Path targetRoot) {
      this.sourceRoot = sourceRoot;
      this.targetRoot = targetRoot;
  }

  @Override
  public FileVisitResult visitFileFailed(Path file, IOException exc)
   throws IOException {
      System.out.println("Error accessing file: " + file.toAbsolutePath() 
      + " " + exc.getMessage());
      return FileVisitResult.CONTINUE;
  }

  @Override
  public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs)
   throws IOException {

    // get relative path (removes root path info from absolute source path)
    // of source directory
    Path relativizedSourcePath = sourceRoot.relativize(dir);
    System.out.println("relativizedSourcePath = " + relativizedSourcePath);

    // appends the source relative path to destination target absolute path
    Path destinationPath = targetRoot.resolve(relativizedSourcePath);
    System.out.println("Resolved path for copy = " + destinationPath);

    try {
        Files.copy(dir, destinationPath);
    } catch(IOException e) {
        System.out.println(e.getMessage());
        // since this directory has errors, skip its sub-directories too
        return FileVisitResult.SKIP_SUBTREE;
    }

    return FileVisitResult.CONTINUE;
  }

  @Override
  public FileVisitResult visitFile(Path file, BasicFileAttributes attrs)
   throws IOException {
      Path relativizedSourcePath = sourceRoot.relativize(file);
      System.out.println("relativizedSourcePath = " + relativizedSourcePath);

      Path destinationPath = targetRoot.resolve(relativizedSourcePath);
      System.out.println("Resolved path for copy = " + destinationPath);

      try {
          Files.copy(file, destinationPath);
      } catch(IOException e) {
          System.out.println(e.getMessage());
      }

      return FileVisitResult.CONTINUE;
  }
}`

  constructor() { }

  ngOnInit(): void {
  }

  onHighlight(e) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      second_best: '{...}',
      top: '{...}',
      value: '{...}'
    }
  }
}
