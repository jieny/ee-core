@echo off

echo publish package

rem 先修改 package.json 里的版本
call npm publish

@cmd /k
