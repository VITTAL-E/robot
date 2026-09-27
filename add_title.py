import glob
import os

def main():
    target_dir = r"C:\Users\ADMIN\Desktop\websites phase 2\ROBOT"
    html_files = glob.glob(os.path.join(target_dir, "*.html"))
    
    for file_path in html_files:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        # If it already has a title, skip or replace. Let's just assume it doesn't have one as we checked index.html.
        if "<title>" not in content:
            new_content = content.replace("</head>", "\n<title>Nexus Robotics</title>\n</head>")
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Added title to {os.path.basename(file_path)}")
        else:
            print(f"{os.path.basename(file_path)} already has a title.")

if __name__ == "__main__":
    main()
