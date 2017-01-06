# ShmupWars - Vala

Converted to autovala, so cmake is required.

## install

### Linux (ElementaryOS)
Install dependancies, 
```
$ cd ~/Downloads
$ sudo apt-get install libsdl2-dev libsdl2-gfx-dev libsdl2-image-dev libsdl2-mixer-dev libsdl2-ttf-dev libsdl2-net-dev
$ git clone https://github.com/sdl2-vapi/sdl2-vapi
$ cd sdl2-vapi
$ sudo cp ./*.{vapi,deps} /usr/share/vala/vapi/ -R --force
```

Now the application
```
$ cd ~/Applications
$ git clone git@github.com:darkoverlordofdata/shmupwarz-vala.git
$ cd shmupwarz-vala
$ mkdir install
$ cd install
$ cmake ..
$ make
$ sudo make install
```

### Windows 10
For windows, I manually downloaded all the bits from https://www.libsdl.org/, and
copied the dlls, libs, inludes, etc to the appropriate folder in C:\Program Files\Vala for Windows\local

I use vscode
ren .vscode/tasks.windows.json .vscode/tasks.json
ren .vscode/launch.windows.json .vscode/launch.json
Use ctrl-b to build, f5 to run


![screenshot](https://github.com/darkoverlordofdata/shmupwarz-vala/blob/master/Screenshot.png)


### notes

* sdl2-mixer.vapi patched to play sound effect *.wav 
* Use vscode ctrl-b to build, f5 to run
