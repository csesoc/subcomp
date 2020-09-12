use rocket::response::NamedFile;
use std::path::{Path, PathBuf};

#[get("/")]
pub fn index() -> Option<NamedFile> {
    NamedFile::open("public/index.html").ok()
}

#[get("/<file..>", rank = 2)]
pub fn files(file: PathBuf) -> Option<NamedFile> {
    NamedFile::open(Path::new("public/").join(file)).ok()
}

#[get("/*", rank = 3)]
pub fn redirect() -> Option<NamedFile> {
    NamedFile::open("public/index.html").ok()
}
