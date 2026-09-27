import glob
import os

def main():
    target_dir = r"C:\Users\ADMIN\Desktop\websites phase 2\ROBOT"
    html_files = glob.glob(os.path.join(target_dir, "*.html"))
    for file_path in html_files:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        new_content = content.replace("assets/favicon-dark.png", "assets/nexus-robotics-favicon.png")
        
        if new_content != content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated {os.path.basename(file_path)}")

if __name__ == "__main__":
    main()
